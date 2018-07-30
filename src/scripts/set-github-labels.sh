echo ''
echo 'This script will remove the GitHub default labels and create the conventional commit labels for your repo. A personal access token is required to access private repos.'

echo ''
echo -n 'GitHub Personal Access Token: '
read -s TOKEN

echo ''
echo -n 'GitHub Org/Repo (e.g. foo/bar): '
read REPO

REPO_USER=$(echo "$REPO" | cut -f1 -d /)
REPO_NAME=$(echo "$REPO" | cut -f2 -d /)

# Delete default labels
curl -u $TOKEN:x-oauth-basic --request DELETE https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels/bug
curl -u $TOKEN:x-oauth-basic --request DELETE https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels/duplicate
curl -u $TOKEN:x-oauth-basic --request DELETE https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels/enhancement
curl -u $TOKEN:x-oauth-basic --request DELETE https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels/good%20first%20issue
curl -u $TOKEN:x-oauth-basic --request DELETE https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels/help%20wanted
curl -u $TOKEN:x-oauth-basic --request DELETE https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels/invalid
curl -u $TOKEN:x-oauth-basic --request DELETE https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels/question
curl -u $TOKEN:x-oauth-basic --request DELETE https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels/wontfix

# Create commitizen labels
curl -u $TOKEN:x-oauth-basic --include --request POST --data '{ "name": "build :construction:", "color": "800000", "description": "Affects the build system or external dependencies." }' "https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels"
curl -u $TOKEN:x-oauth-basic --include --request POST --data '{ "name": "chore :clipboard:", "color": "076443", "description": "Other changes that do not modify src or test files." }' "https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels"
curl -u $TOKEN:x-oauth-basic --include --request POST --data '{ "name": "ci :ok_hand:", "color": "83128d", "description": "Changes CI configuration files and scripts." }' "https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels"
curl -u $TOKEN:x-oauth-basic --include --request POST --data '{ "name": "docs :book:", "color": "e0f2f2", "description": "Adds or alters documentation." }' "https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels"
curl -u $TOKEN:x-oauth-basic --include --request POST --data '{ "name": "feat :tada:", "color": "f0d000", "description": "Adds a new feature." }' "https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels"
curl -u $TOKEN:x-oauth-basic --include --request POST --data '{ "name": "fix :hospital:", "color": "72ba3a", "description": "Solves a bug." }' "https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels"
curl -u $TOKEN:x-oauth-basic --include --request POST --data '{ "name": "perf :racehorse:", "color": "0069d9", "description": "Improves performance." }' "https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels"
curl -u $TOKEN:x-oauth-basic --include --request POST --data '{ "name": "refactor :triangular_ruler:", "color": "ff9e45", "description": "Rewrites code without feature, performance or bug changes." }' "https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels"
curl -u $TOKEN:x-oauth-basic --include --request POST --data '{ "name": "revert :rewind:", "color": "343a40", "description": "Reverts a previous commit." }' "https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels"
curl -u $TOKEN:x-oauth-basic --include --request POST --data '{ "name": "style :nail_care:", "color": "c000c0", "description": "Improves formatting, white-space." }' "https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels"
curl -u $TOKEN:x-oauth-basic --include --request POST --data '{ "name": "test :white_check_mark:", "color": "d75466", "description": "Adds or modifies tests." }' "https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels"

# Create reference labels
curl -u $TOKEN:x-oauth-basic --include --request POST --data '{ "name": "enables :boom:", "color": "00c000", "description": "Allows another issue to be solved." }' "https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels"
curl -u $TOKEN:x-oauth-basic --include --request POST --data '{ "name": "depends :on:", "color": "c2a0f5", "description": "Depends on another issue to be solved first." }' "https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels"

# Create info labels
curl -u $TOKEN:x-oauth-basic --include --request POST --data '{ "name": "high priority", "color": "ff2800", "description": "Should be done first." }' "https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels"
curl -u $TOKEN:x-oauth-basic --include --request POST --data '{ "name": "low priority", "color": "d3d3d3", "description": "Should be done last." }' "https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels"
curl -u $TOKEN:x-oauth-basic --include --request POST --data '{ "name": "good for newcomers :baby_bottle:", "color": "fff68f", "description": "Good for new contributors." }' "https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels"
curl -u $TOKEN:x-oauth-basic --include --request POST --data '{ "name": "invalid :warning:", "color": "f5f5dc", "description": "Invalid issue that should be ignored." }' "https://api.github.com/repos/$REPO_USER/$REPO_NAME/labels"
