@echo off

IF "%SITE_FLAVOR%" == "nodejs" (
  .\Automation\deploy.node.cmd
) ELSE (
  IF "%SITE_FLAVOR%" == "webapi" (
	.\Automation\deploy.webapi.cmd
  ) ELSE (
	echo You have to set SITE_FLAVOR setting to either "nodejs" or "webapi"
	exit /b 1
  )
)