#!/usr/bin/env bash

apt-get update

# install apache
apt-get install -q -y apache2

# /vagrant is shared by default
# symlink that to /var/www
# this will be the pubic root of the site

# configuration files live at /etc/apache2/
rm -rf /var/www
ln -fs /vagrant /var/www

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
sudo apt-get install nodejs
sudo apt-get install npm
sudo npm install npm -g

# Install Bower and gulp
sudo npm install bower -g

cd /var/www && bower install sudo-web-framework
