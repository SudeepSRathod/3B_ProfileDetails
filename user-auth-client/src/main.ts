import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Provides routing configuration
    importProvidersFrom(ReactiveFormsModule, HttpClientModule),  // Import reactive forms and HTTP modules
    provideHttpClient(withInterceptorsFromDi())  // Register HTTP client with interceptors from DI container
  ]
}).catch(err => console.error(err));
