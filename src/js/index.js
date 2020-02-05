
import '../css/layout.css';
import '../css/header.css';
import '../css/card.css';
import '../css/tooltip.css';
import '../css/modal.css';

import { UI } from './ui';
import { DataSource } from './data-source';
import { Modal } from './modal';

window.onload = async (event) => {
  const ui = UI.getInstance();
  const dataSource = DataSource.getInstance();
  await dataSource.initialize();
  Array.from(dataSource.appsPerHostMap.keys()).forEach(
    hostName => {
      const topFiveAppsForHost = dataSource.getTopNumberOfApps(dataSource.getAppsForHost(hostName), 5);
      ui.createCard(document.querySelector('.main-content'), hostName, topFiveAppsForHost);
    }
  );

  Modal.getInstance().initializeHandlers();

  document.querySelector('#checkbox-show-as').addEventListener('change', event => {
    ui.updateViewType();
    ui.updateEmailTextWidth();
    ui.updateCheckboxLabel();
    ui.resetCheckbox(event.target);
    ui.updateCardWidth(event);
  });
}