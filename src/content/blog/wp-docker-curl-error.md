---
title: "WP Docker Curl Error"
pubDate: 2019-03-29
tags: [wordpress, docker, troubleshooting]
---

If you are using Docker for WordPress development you may have discovered an issue while trying to connect to your installation from the CLI.

Trying to do any internal API calls normally result in a `curl` call. In my case I had this annoying error:

`cURL error 7: Failed to connect to local.test port 80 Connection refused`

<!--more-->

The fix ended up being fairly simple after I understood the issue. The main issue was that PHP and the service entry point, nginx, live in separate containers. To add to this, the WordPress hostname in the Database is not the same as the one our docker network container is known by.

The first step here is to see which service are running you must run:

`docker-compose ps`

```
Name                       Command                State                        Ports
------------------------------------------------------------------------------
woocom_elasticsearch_1   /bin/bash bin/es-docker          Up         0.0.0.0:9200->9200/tcp, 9300/tcp              
woocom_mailcatcher_1     mailcatcher --no-quit --fo ...   Up         0.0.0.0:1025->1025/tcp, 0.0.0.0:1080->1080/tcp
woocom_memcached_1       docker-entrypoint.sh memcached   Up         11211/tcp                                     
woocom_mysql_1           docker-entrypoint.sh mysqld      Up         0.0.0.0:3306->3306/tcp                        
woocom_nginx_1           nginx -g daemon off;             Up         0.0.0.0:443->443/tcp, 0.0.0.0:80->80/tcp      
woocom_phpfpm_1          docker-php-entrypoint php-fpm    Up         9000/tcp                                      
woocom_wpsnapshots_1     docker-php-entrypoint sh - ...   Exit 255   9000/tcp 
```

The one we are after is `*_nginx_1`. Look for the one with nginx in the name. This is the domain name your scripts have to use to access the web server when curling your own sites api.

The final step in the process will be to tell WP which one to use when running CLI scripts. To do so add this to your functions.php:

```
add_filter( 'home_url', function( $url ) {
	if ( defined('WP_CLI') && WP_CLI ){
		$url = str_replace( 'local.test', 'nginx_1', $url );  // replace with your service name and url
	}
	return $url;
});
```
