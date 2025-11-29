# Android List App

A lightweight Android application for list maintenance, built with Expo (React Native) and designed to be built as a standalone APK via GitHub Actions.

## Features
- **Local Storage**: Items are saved on your device.
- **Google Sign-In**: Authenticate with your Google account.
- **Drive Backup**: Backup and restore your list from Google Drive.
- **Standalone APK**: No Expo Go required.

## How to Build (APK)

This project is configured to build a release APK using GitHub Actions.

### One-Time Setup
1.  **Generate Keystore**:
    -   Go to **Actions** tab in GitHub.
    -   Run the **Setup Android Keystore** workflow.
    -   **Download the artifact** (`keystore-and-secrets`) from the run summary.
    -   Extract it to find `secrets.txt` and `my-upload-key.keystore`.

2.  **Configure Secrets**:
    -   Go to **Settings -> Secrets and variables -> Actions** in your repository.
    -   Add the secrets listed in `secrets.txt` (`ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, etc.).
    -   *Note: You may see lint warnings in `android-build.yml` about missing secrets. These will be resolved once you add them here.*

3.  **Google Cloud**:
    -   Create an **Android Client ID** in Google Cloud Console.
    -   Package Name: `com.aarsh.listandroid`
    -   SHA-1: Use the value from `secrets.txt`.

### Build
-   Go to **Actions** tab, select **Build Android APK**, and click **Run workflow**.
-   Download the APK from **Releases** or Action artifacts.

## Development
-   Run `npx expo start` to develop locally (requires Expo Go).
