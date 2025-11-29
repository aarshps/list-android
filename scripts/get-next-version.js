const { execSync } = require('child_process');

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return [d.getUTCFullYear(), weekNo];
}

try {
    // Fetch tags
    execSync('git fetch --tags');

    // Get the latest tag
    let latestTag = '';
    try {
        latestTag = execSync('git describe --tags --abbrev=0', { stdio: 'pipe' }).toString().trim();
    } catch (e) {
        // No tags found
    }

    if (!latestTag) {
        console.log('0.0.1');
        process.exit(0);
    }

    // Get the date of the latest tag
    const tagDateStr = execSync(`git log -1 --format=%ai ${latestTag}`).toString().trim();
    const tagDate = new Date(tagDateStr);
    const currentDate = new Date();

    const [tagYear, tagWeek] = getWeekNumber(tagDate);
    const [currentYear, currentWeek] = getWeekNumber(currentDate);

    const isSameDay = tagDate.toDateString() === currentDate.toDateString();
    const isNewWeek = tagYear !== currentYear || tagWeek !== currentWeek;

    let [major, minor, patch] = latestTag.replace(/^v/, '').split('.').map(Number);

    if (isNewWeek) {
        major++;
        minor = 0;
        patch = 0;
    } else if (!isSameDay) {
        minor++;
        patch = 0;
    } else {
        patch++;
    }

    console.log(`${major}.${minor}.${patch}`);

} catch (error) {
    console.error('Error calculating version:', error);
    process.exit(1);
}
