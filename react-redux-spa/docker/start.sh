#!/bin/sh

env >> /etc/environment


p="/etc/nginx/nginx.conf"
vars=`cat /etc/environment | cut -d = -f 1`
for var in $vars; do
  eval "val=\$$var"
  sed -i "s/$(echo \$$var | sed -e 's/\([[\/.*]\|\]\)/\\&/g')/$(echo $val | sed -e 's/[\/&]/\\&/g')/g" $p
done

/usr/sbin/nginx


