STATUS="$(git status)"

if [[ $STATUS == *"nothing to commit, working tree clean"* ]]
then
    # sed -i "" 'client-web-app/dist/*' ./.gitignore
    # git add .
    # git commit -m "Edit .gitignore to publish"
    git subtree split --prefix client-web-app/dist -b gh-pages
    git push -f origin gh-pages:gh-pages
    git branch -D gh-pages
    # git reset HEAD~
    # git checkout .gitignore
else
    echo "Need clean working directory to publish"
fi
