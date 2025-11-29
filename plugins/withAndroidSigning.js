const { withAppBuildGradle } = require('@expo/config-plugins');

module.exports = function withAndroidSigning(config) {
    return withAppBuildGradle(config, (config) => {
        if (config.modResults.language === 'groovy') {
            config.modResults.contents = addSigningConfig(config.modResults.contents);
        }
        return config;
    });
};

function addSigningConfig(buildGradle) {
    const signingConfig = `
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
  `;

    let newGradle = buildGradle;

    // Add signing config to signingConfigs block
    if (newGradle.includes('signingConfigs {') && !newGradle.includes('storeFile file(MYAPP_UPLOAD_STORE_FILE)')) {
        newGradle = newGradle.replace('signingConfigs {', 'signingConfigs {' + signingConfig);
    }

    // Add signingConfig to release build type
    // We look for "buildTypes {" then "release {"
    // And we replace "signingConfig signingConfigs.debug" with "signingConfig signingConfigs.release"
    // OR if it doesn't exist, we insert it.

    if (newGradle.includes('buildTypes {')) {
        if (newGradle.includes('signingConfig signingConfigs.debug')) {
            newGradle = newGradle.replace('signingConfig signingConfigs.debug', 'signingConfig signingConfigs.release');
        } else {
            // Fallback: try to insert it into release block if we can find it reliably
            // This is harder without a parser.
            // But standard template usually has signingConfig signingConfigs.debug in release for Expo dev client builds?
            // Actually, standard "blank" template might NOT have signingConfig in release.

            // Let's try to find "release {" and append it.
            const releaseBlockRegex = /release\s*\{/;
            if (releaseBlockRegex.test(newGradle)) {
                newGradle = newGradle.replace(releaseBlockRegex, 'release {\n            signingConfig signingConfigs.release');
            }
        }
    }

    return newGradle;
}
