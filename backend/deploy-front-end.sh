STATUS="$(git status)"

if [[ $STATUS == *"nothing to commit, working tree clean"* ]]
then
    echo "deploying web-app"
    cd client-web-app/dist/
    git init
    git checkout -b gh-pages
    touch .nojekyll
    git add .
    git commit -m "deply web-app"
    git push https://github.kcl.ac.uk/k1502800/Tandem.git gh-pages --force

else
    echo "Need clean working directory to publish"
fi
