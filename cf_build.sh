CF_API_ENDPOINT=$3
CF_ORG=$4
CF_SPACE=$5
APP_NAME=$1
LATEST_VERSION=$2
MANIFEST_FILE=$6
SVC_ACCT_USERNAME=$7
SVC_ACCT_PASSWORD=$8


echo " getting the jar from artifactory"

echo "https://maven.artifactory.com/artifactory/libs-release-local/com/sos/sif/$APP_NAME/${LATEST_VERSION}/$APP_NAME-${LATEST_VERSION}.jar"

curl -X GET https://maven.artifactory.com/artifactory/libs-release-local/com/sos/sif/$APP_NAME/${LATEST_VERSION}/$APP_NAME-${LATEST_VERSION}.jar -o "$APP_NAME.jar"

ls $APP_NAME.jar



echo "Logging in to cloud foundry"
cf login -a https://${CF_API_ENDPOINT} -u ${SVC_ACCT_USERNAME} -p ${SVC_ACCT_PASSWORD} -o "${CF_ORG}" -s "${CF_SPACE}" --skip-ssl-validation

echo "pushing the jar"
cf push -p $APP_NAME.jar  -f ${MANIFEST_FILE}

echo "logging out from cloud foundry"
cf logout

echo "cleanup"
rm $APP_NAME.jar
