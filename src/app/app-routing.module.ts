import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'onbroading', pathMatch: 'full' },
  { path: 'landing', loadChildren: () => import('./pages/auth/landing-page/landing-page.module').then(m => m.LandingPageModule) },
  { path: 'inscricao', loadChildren: () => import('./pages/auth/inscricao/inscricao.module').then(m => m.InscricaoModule) },
  { path: 'signin', loadChildren: () => import('./pages/auth/signin/signin.module').then(m => m.SigninModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'favorite', loadChildren: () => import('./pages/favorite/favorite.module').then(m => m.FavoriteModule) },
  { path: 'onbroading', loadChildren: () => import('./pages/onboarding/onboarding.module').then(m => m.OnboardingModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
