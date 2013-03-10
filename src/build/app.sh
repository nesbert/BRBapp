r.js -o $(dirname $0)/app.build.js
cd ../app
echo 'post build..'

# requirejs
mv -v vendor/requirejs/require.js require.js
echo 'deleting...'
rm -rfv vendor/requirejs
mkdir vendor/requirejs && mv -v require.js vendor/requirejs/require.js

# scripts
mkdir scripts.tmp
mv -v scripts/*.js scripts.tmp
echo 'deleting...'
rm -rfv scripts build build.txt
mv -v scripts.tmp scripts

# css
mv css/main.css main.css && rm -rf css/* && mv main.css css/main.css

# boostrap
mkdir vendor/bootstrap/css && cp -fv ../src/vendor/bootstrap/css/*.min.css vendor/bootstrap/css/
mkdir vendor/bootstrap/img && cp -fv ../src/vendor/bootstrap/img/*.png vendor/bootstrap/img/
cp -fv ../src/vendor/bootstrap/js/bootstrap.min.js vendor/bootstrap/js/bootstrap.min.js