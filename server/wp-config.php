<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp-server' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '698iJLMs49gjU9`j7~R?<5T>cZ2t53h.lKCr+x>%%sxr4,w_M.j-Cb^+n@J(n$hq' );
define( 'SECURE_AUTH_KEY',  '4s(gV?%R`N(iV(RIM6yhA$/8LP;={%=X(c|eY_mYNiJF !]ZeHn>[?`c*lt]#YY=' );
define( 'LOGGED_IN_KEY',    'h5+L{,,*q6^Z=w=y)S+1g25Xeg1i{Lxql0OH4l]V,dCkD{*G@%mTaof-`^j,t#m[' );
define( 'NONCE_KEY',        'P^:N c0Mmfvd~!,j+Mi;xcr.x);B|,71vnfsoN[>8(s,(8h/097H/o#p^y4}c2`@' );
define( 'AUTH_SALT',        'jRM$!_@b,Y9.y^;[02d?I5vAKvb!hD3#+crG-dMvVxwV<1UIZk5Hgt,F;LflDldd' );
define( 'SECURE_AUTH_SALT', '7;d~VmlPa5lkU4BG`5Na,DcXC^#dwPUe%`R9V+?3{Md6D9@H${X4X.jRuV6,J4n!' );
define( 'LOGGED_IN_SALT',   'e&A&*k+fq=`V?1uerD$i9?f# 6x:mdn1+|Jr`<c(r1B=QJi6;.m%Z)H1L+4KxvD(' );
define( 'NONCE_SALT',       'w3$B~Q1<DD(32$y6w.o?Pu[Q;GoW4w7S7Q*`_M>.k{~w?00b6j]U1=-n{=%n7Xo[' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
