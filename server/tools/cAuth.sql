/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : cAuth

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 08/10/2017 22:22:52 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cSessionInfo`
-- ----------------------------
DROP TABLE IF EXISTS `cSessionInfo`;
CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`open_id`),
  KEY `openid` (`open_id`) USING BTREE,
  KEY `skey` (`skey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';

DROP TABLE IF EXISTS `carinfo`;
CREATE TABLE `carinfo` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`idcardno`  varchar(18) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '身份证号' ,
`carno`  varchar(10) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '车牌号' ,
`phoneno`  varchar(20) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '手机号' ,
`openid`  varchar(50) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT 'openid' ,
`available`  varchar(2) COLLATE utf8mb4_unicode_ci NULL DEFAULT '1' COMMENT '是否可用' ,
`createdate`  bigint(20) NULL DEFAULT NULL ,
`updatedate`  bigint(20) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;

DROP TABLE IF EXISTS `syscode`;
CREATE TABLE `syscode` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`code`  varchar(20) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL ,
`value`  varchar(50) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL ,
`type`  varchar(20) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL ,
`createdate`  bigint(20) NULL DEFAULT NULL ,
`updatedate`  bigint(20) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;

DROP TABLE IF EXISTS `insuranceinfo`;
CREATE TABLE `insuranceinfo` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`direct`  varchar(20) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '直接续保' ,
`jdcssx`  varchar(20) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '机动车损失险' ,
`dszzrx`  varchar(20) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '第三者责任险' ,
`csryzrxsj`  varchar(20) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '车上人员责任险（司机）' ,
`csryzrxck`  varchar(20) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '车上人员责任险（乘客）' ,
`blddpsx`  varchar(20) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '玻璃单独破碎险' ,
`jdcdqx`  varchar(20) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '机动车盗抢险' ,
`zrsxx`  varchar(20) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '自然损失险' ,
`cshhsxx`  varchar(20) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '车身划痕损失险' ,
`fdjtbssx`  varchar(20) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '发动机特别损失险（涉水险）' ,
`bjmpx`  varchar(20) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '不计免赔险' ,
`wfzddsftyx`  varchar(20) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '无法找到第三方特约险' ,
`status`  varchar(2) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '询价状态' ,
`createdate`  bigint(20) NULL DEFAULT NULL ,
`updatedate`  bigint(20) NULL DEFAULT NULL ,
`carinfoid`  int(11) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;

DELIMITER $$
DROP FUNCTION IF EXISTS `getsyscodename`$$
CREATE FUNCTION `getsyscodename`(code VARCHAR(50) charset utf8,dicttype VARCHAR(50) charset utf8) RETURNS varchar(255)
BEGIN
DECLARE x VARCHAR(50) charset utf8 DEFAULT '';
select syscode.`value` INTO x from syscode where syscode.`code` = code and syscode.type = dicttype limit 1;
RETURN x;
END $$
DELIMITER ;

DROP TABLE IF EXISTS `quote`;
CREATE TABLE `quote` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`price`  varchar(20) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '报价金额' ,
`tbr`  varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '填表人' ,
`insuranceid`  int(11) NULL DEFAULT NULL COMMENT '询价表id' ,
`createdate`  bigint(20) NULL DEFAULT NULL COMMENT '报价表' ,
`updatedate`  bigint(20) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;

DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`title`  varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL ,
`content`  text COLLATE utf8mb4_unicode_ci NULL ,
`tbr`  varchar(255) COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '填表人' ,
`previewimage`  MEDIUMTEXT COLLATE utf8mb4_unicode_ci NULL ,
`available`  varchar(2) COLLATE utf8mb4_unicode_ci NULL DEFAULT '1' COMMENT '是否可用' ,
`createdate`  bigint(20) NULL DEFAULT NULL ,
`updatedate`  bigint(20) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ;

CREATE TABLE `carousel` (
`id`  int(11) NOT NULL AUTO_INCREMENT,
`order`  int(11) NULL DEFAULT NULL ,
`url`  varchar(255)  COLLATE utf8mb4_general_ci NULL DEFAULT NULL ,
`tbr`  varchar(50) COLLATE utf8mb4_general_ci NULL DEFAULT NULL ,
`available`  varchar(2) COLLATE utf8mb4_unicode_ci NULL DEFAULT '1' COMMENT '是否可用' ,
`createdate`  bigint(20) NULL DEFAULT NULL ,
`updatedate`  bigint(20) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci
ROW_FORMAT=DYNAMIC
;

CREATE TABLE `servicenumber` (
`id`  int(11) NOT NULL AUTO_INCREMENT ,
`phonenumber`  varchar(30) COLLATE utf8mb4_general_ci NULL DEFAULT NULL ,
`createdate`  bigint(20) NULL DEFAULT NULL ,
`updatedate`  bigint(20) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_general_ci
AUTO_INCREMENT=1
ROW_FORMAT=DYNAMIC
;

insert into syscode(value,code,type,createdate)
VALUES
('不投','0','dszzrx','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('5万','5','dszzrx','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('10万','10','dszzrx','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('20万','20','dszzrx','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('30万','30','dszzrx','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('50万','50','dszzrx','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('100万','100','dszzrx','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('150万','150','dszzrx','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('200万','200','dszzrx','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('250万','250','dszzrx','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('300万','300','dszzrx','1519365485197');


insert into syscode(value,code,type,createdate)
VALUES
('不投','0','csryzrxsj','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('1万','1','csryzrxsj','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('2万','2','csryzrxsj','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('5万','5','csryzrxsj','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('10万','10','csryzrxsj','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('20万','20','csryzrxsj','1519365485197');


insert into syscode(value,code,type,createdate)
VALUES
('不投','0','csryzrxck','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('1万/座','1','csryzrxck','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('2万/座','2','csryzrxck','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('5万/座','5','csryzrxck','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('10万/座','10','csryzrxck','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('20万/座','20','csryzrxck','1519365485197');

insert into syscode(value,code,type,createdate)
VALUES
('不投','0','blddpsx','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('国产','guochan','blddpsx','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('进口','jinkou','blddpsx','1519365485197');

insert into syscode(value,code,type,createdate)
VALUES
('不投','0','cshhsxx','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('2000','2000','cshhsxx','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('5000','5000','cshhsxx','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('10000','10000','cshhsxx','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('20000','20000','cshhsxx','1519365485197');

insert into syscode(value,code,type,createdate)
VALUES
('待报价','0','insurancestatus','1519365485197');
insert into syscode(value,code,type,createdate)
VALUES
('已完成','1','insurancestatus','1519365485197');

SET FOREIGN_KEY_CHECKS = 1;
