STATUS="$(git status)"

if [[ $STATUS == *"nothing to commit, working tree clean"* ]]
then
    sed -i "" 'client-web-app/dist/*' ./.gitignore
    git add .
    git commit -m "Edit .gitignore to publish"
    git subtree push --prefix client-web-app/dist/ origin gh-pages --force
    git reset HEAD~
    git checkout .gitignore
else
    echo "Need clean working directory to publish"
fi
