const BOUNDARY = 'foo_bar_baz';

export const uploadBackup = async (accessToken, listData) => {
    const metadata = {
        name: 'list_backup.json',
        mimeType: 'application/json',
        // parents: ['appDataFolder'] // Optional: store in appDataFolder so user doesn't see it in main drive
    };

    const fileContent = JSON.stringify(listData);

    const multipartBody =
        `--${BOUNDARY}\r\n` +
        `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
        `${JSON.stringify(metadata)}\r\n` +
        `--${BOUNDARY}\r\n` +
        `Content-Type: application/json\r\n\r\n` +
        `${fileContent}\r\n` +
        `--${BOUNDARY}--`;

    try {
        // First check if file exists to update it, or create new
        // For simplicity, we'll just create a new one or we could search first.
        // Let's search first to avoid duplicates.
        const searchResponse = await fetch(
            'https://www.googleapis.com/drive/v3/files?q=name="list_backup.json" and trashed=false',
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
        const searchResult = await searchResponse.json();

        let url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
        let method = 'POST';

        if (searchResult.files && searchResult.files.length > 0) {
            const fileId = searchResult.files[0].id;
            url = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=multipart`;
            method = 'PATCH';
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': `multipart/related; boundary=${BOUNDARY}`,
            },
            body: multipartBody,
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error uploading backup', error);
        throw error;
    }
};

export const downloadBackup = async (accessToken) => {
    try {
        const searchResponse = await fetch(
            'https://www.googleapis.com/drive/v3/files?q=name="list_backup.json" and trashed=false',
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
        const searchResult = await searchResponse.json();

        if (!searchResult.files || searchResult.files.length === 0) {
            throw new Error('No backup found');
        }

        const fileId = searchResult.files[0].id;
        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error downloading backup', error);
        throw error;
    }
};
