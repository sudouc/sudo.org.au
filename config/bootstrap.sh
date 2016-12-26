#!/usr/bin/env bash

apt-get update

# install apache
apt-get install -q -y apache2

# /vagrant is shared by default
# symlink that to /var/www
# this will be the pubic root of the site

################################################################################

# Enable SSI following (mostly) the directions here:
# https://help.ubuntu.com/community/ServerSideIncludes

# Add the Includes module
a2enmod include

# Add Includes, AddType and AddOutputFilter directives
mv /etc/apache2/sites-available/default /etc/apache2/sites-available/default.bak
cp /vagrant/config/default /etc/apache2/sites-available/default

# To allow includes in index pages
mv /etc/apache2/mods-available/dir.conf /etc/apache2/mods-available/dir.conf.bak
cp /vagrant/config/dir.conf /etc/apache2/mods-available/dir.conf

# restart apache2
apachectl -k graceful


# Install Node.js and npm
apt-get install -q -y curl git

curl -sL https://deb.nodesource.com/setup_6.x | bash -
apt-get install -y nodejs

# Install Bower and gulp
npm install bower -g

cd /var/www && bower install sudo-web-framework --allow-root
