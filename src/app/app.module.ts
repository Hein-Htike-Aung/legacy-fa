import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  ArrowUpNarrowWide,
  BellDot,
  Briefcase,
  CircleGauge,
  Download,
  LineChart,
  LogOut,
  LucideAngularModule,
  MessageCircle,
  MessageSquareMore,
  Mic,
  Search,
  Settings,
  ShoppingCart,
  Sun,
  User,
  Calendar,
  BadgeDollarSign,
  Users,
  SendToBack,
  Codesandbox,
} from 'lucide-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './app-material.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    LucideAngularModule.pick({
      ArrowUpNarrowWide,
      CircleGauge,
      LineChart,
      Briefcase,
      ShoppingCart,
      MessageCircle,
      User,
      Settings,
      LogOut,
      Download,
      Search,
      Mic,
      Sun,
      MessageSquareMore,
      BellDot,
      Calendar,
      BadgeDollarSign,
      Users,
      Codesandbox,
      SendToBack,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
