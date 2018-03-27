import { remote } from 'electron';
import { GOOGLE_ANALYTICS_ID } from '../config/config';

const { app } = remote;

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

const GA_LOCAL_STORAGE_KEY = 'gaUid';

ga('create', GOOGLE_ANALYTICS_ID, {
  storage: 'none',
  clientId: localStorage.getItem(GA_LOCAL_STORAGE_KEY),
});

ga((tracker) => {
  localStorage.setItem(GA_LOCAL_STORAGE_KEY, tracker.get('clientId'));
});
ga('set', 'checkProtocolTask', null);
ga('set', 'version', app.getVersion());
ga('send', 'App');

export function gaPage(page) {
  ga('send', 'pageview', page);

  console.debug('GA track page', page);
}

export function gaEvent(category, action, label) {
  ga('send', 'event', category, action, label);

  console.debug('GA track page', category, action);
}

setTimeout(() => {
  ga('send', 'Ping');
}, 1000 * 60 * 10); // Ping GA every 10 Minutes
