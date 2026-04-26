# Publishing Secrets Recovery

The keystore and secret configurations required to build and publish the release version of this app are securely stored in Bitwarden.

**Location in Bitwarden:**
* **Folder:** `Hora`
* **Secure Note Name:** `List-Android Publishing Secrets`

## How to Retrieve
1. Open Bitwarden and locate the Secure Note mentioned above.
2. Inside the Secure Note, you will find "Custom Fields" containing Base64 encoded strings for the required files.
3. Look for the fields named `my-upload-key.keystore` and `secrets.txt`.
4. Copy the Base64 value of each field.
5. Decode the Base64 value into a file using a terminal or an online tool.

**Example (Windows PowerShell):**
```powershell
[IO.File]::WriteAllBytes("my-upload-key.keystore", [Convert]::FromBase64String("BASE64_STRING_HERE"))
```

**Example (macOS/Linux):**
```bash
echo "BASE64_STRING_HERE" | base64 --decode > my-upload-key.keystore
```

## File Placement & Usage
* `my-upload-key.keystore`: This is the signing keystore. The build configuration expects this path to be provided via the `MYAPP_UPLOAD_STORE_FILE` gradle property.
* `secrets.txt`: Contains the `Key Alias`, `Keystore Password`, and `Key Password`. Provide these to gradle using the `MYAPP_UPLOAD_STORE_PASSWORD`, `MYAPP_UPLOAD_KEY_ALIAS`, and `MYAPP_UPLOAD_KEY_PASSWORD` properties in your `gradle.properties` file or environment.