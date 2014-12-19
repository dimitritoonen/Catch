@echo off

IF "%SITE_FLAVOR%" == "nodejs" (
  .\src\Automation\deploy.node.cmd
) ELSE (
  IF "%SITE_FLAVOR%" == "webapi" (
	.\src\Automation\deploy.webapi.cmd
  ) ELSE (
	echo You have to set SITE_FLAVOR setting to either "nodejs" or "webapi"
	exit /b 1
  )
)