import { DocumentDirectoryPath, DownloadDirectoryPath, copyFile, mkdir, readDir, unlink } from "@dr.pogodin/react-native-fs";
import { getTimeNow } from "./utils";

export const DATABASE_PATH = `${DocumentDirectoryPath}/pesagem.db`;
export const DATABASE_SNAPSHOTS_PATH = `${DocumentDirectoryPath}/snapshots`;

export const backupDB = (callBack?: (path: string) => void) => {
    const backupPath = `${DownloadDirectoryPath}/pesagem_backup_${getTimeNow()}.db`;
    copyFile(DATABASE_PATH, backupPath).then(() => callBack?.(backupPath)).catch(console.error);
}

export const restoreDB = (backupPath: string) => {
    copyFile(backupPath, DATABASE_PATH).then(() => console.log('banco de dados restaurado com sucesso')).catch(console.error);
}

export const makeSnapshot = () => {
    mkdir(DATABASE_SNAPSHOTS_PATH).then(() => {
        readDir(DATABASE_SNAPSHOTS_PATH).then(files => {
            if (files.length >= 10) {
                const oldestSnapshot = files.reduce((x, y) => (x?.mtime || 0) < (y?.mtime || 0) ? x : y);
                unlink(oldestSnapshot.path);
            }
        })
        const snapshotPath = `${DATABASE_SNAPSHOTS_PATH}/pesagem_snapshot_${getTimeNow()}.db`;
        copyFile(DATABASE_PATH, snapshotPath).then(() => console.log('snapshot realizado com sucesso')).catch(console.error);
    }).catch(console.error);
}

export const exportSnapshots = (callBack?: (path: string) => void) => {
    readDir(DATABASE_SNAPSHOTS_PATH).then(files => {
        mkdir(`${DownloadDirectoryPath}/vision_pesagem_snapshots`)
            .then(() => files.forEach(file => {
                copyFile(file.path, `${DownloadDirectoryPath}/vision_pesagem_snapshots/${file.name}`)
                    .then(() => callBack?.(file.path))
                    .catch(console.error);
            })).catch(console.error);
    }).catch(console.error);
}