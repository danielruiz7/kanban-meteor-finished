import 'reflect-metadata';
import 'zone.js';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Meteor } from 'meteor/meteor';

import { AppModule } from '../imports/angular/app/app.module';

Meteor.startup(() => {
  if (Meteor.isProduction) enableProdMode();
  platformBrowserDynamic().bootstrapModule(AppModule);
});
