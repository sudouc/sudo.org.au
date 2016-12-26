# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "precise64"

  # The url from where the 'config.vm.box' box will be fetched if it
  # doesn't already exist on the user's system.
  config.vm.box_url = "https://vagrantcloud.com/ubuntu/boxes/trusty64/versions/14.04/providers/virtualbox.box"

  # Provision
  config.vm.provision :shell, :path => "config/bootstrap.sh"
    config.vm.synced_folder "/Users/alex/Development", "/var/www", id: "vagrant-root", :owner => "vagrant", :group => "www-data", :mount_options => ["dmode=777","fmode=666"]

  # Port forwarding
  config.vm.network "forwarded_port", guest: 80, host: 8080
end
