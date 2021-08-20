#!/usr/bin/env sh
# abort on errors
set -env
# build
npm run build
# navigate into the build output directory
cd dist
# if using a custom domain...
# echo 'www.domain.com' > CNAME
git init
git add -agit commit -m 'deploy'
git push -f git@github.com:brendanbax/task_master.git master:gh-pages
cd -
