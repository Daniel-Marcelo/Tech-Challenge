import { AppsOnHost } from './apps-on-host.model';

/**
 * Data source class containing all apps on each host.
 */
export class DataSource {

    static getInstance() {
        if (!DataSource.instance) {
            DataSource.instance = new DataSource();
        }
        return DataSource.instance;
    }

    constructor() {
        this.dataLoader = new DataLoader();
        this.dataConverter = new DataConverter();
    }

    /**
     * Loads the data, converts it to a format the ui can use and stores the converted data.
     */
    async initialize() {
        await this.dataLoader.load();
        const uniqueHostNames = this.dataConverter.getUniqueHostNames(this.dataLoader.apps);
        this.appsPerHostMap = this.dataConverter.createAppsPerHostMap(uniqueHostNames, this.dataLoader.apps);
    }

    getTopNumberOfApps(apps, numberOfApps) {
        return this.dataConverter.getTopNumberOfApps(apps, numberOfApps);
    }

    getTopApps(apps) {
        return this.dataConverter.getTopApps(apps);
    }

    getAppsForHost(hostName) {
        return this.appsPerHostMap.get(hostName);
    }
}

/**
 * Responsible for loading the data from the json file.
 *
 */
class DataLoader {

    async load() {
        const response = await fetch('src/json/data.json');
        this.apps = await response.json();
    }
}

/**
 * Contains many utility methods for converting the json data to a format in which the UI can use.
 */
class DataConverter {

    /**
     * Returns a list of unique host names 
     */
    getUniqueHostNames(appsList) {
        const hostNames = new Set();
        appsList.forEach(app => app.host.forEach(host => hostNames.add(host)));
        return Array.from(hostNames);
    }

    /**
     * Returns the top X apps for the specified host name based on the apdex rating.
     * The list of apps is presorted and so we can just take the first x items in the array.
     */
    getTopNumberOfApps(apps, numberOfApps) {
        return apps.slice(0, numberOfApps);
    }

    /**
     * Apps are sorted on initial load. Simply return the first 25 items of the array.
     *
     */
    getTopApps(apps) {
        return this.getTopNumberOfApps(apps, 25);
    }

    /**
     * Returns a sorted array of apps based on the apdex rating, for the host name specified.
     */
    getAppsOnHost(hostName, appsList) {
        const appsOnHost = appsList.filter(app => app.host.includes(hostName));
        this.sortBasedOnApdex(appsOnHost);
        return appsOnHost;
    }

    /**
     * Creates a list of apps-on-host relationships.
     */
    createAppsPerHostMap(hostNames, appsList) {
        const appsPerHostMap = new Map();
        hostNames.forEach(hostName => appsPerHostMap.set(hostName, this.getAppsOnHost(hostName, appsList)));
        return appsPerHostMap;
    }

    /**
     * Sorts an array of apps based on apdex rating.
     */
    sortBasedOnApdex(appsList) {
        appsList.sort((app1, app2) => {
            if (app1.apdex > app2.apdex) {
                return -1;
            } else if (app1.apdex < app2.apdex) {
                return 1;
            }
            return 0;
        });
    }
}