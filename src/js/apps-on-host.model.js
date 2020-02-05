/**
 * Model associating one host name to many apps.
 * Contains a list of apps that are on the hostname provided.
 *
 * @class AppsOnHost
 */
export class AppsOnHost {

    constructor(hostName, apps = []) {
        this.hostName = hostName;
        this.apps = apps;
    }
}