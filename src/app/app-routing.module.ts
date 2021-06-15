import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MobileComponent } from "./pages/mobile/mobile.component";
import { ProfessionalsComponent } from "./pages/professionals/professionals.component";
import { UsersComponent } from "./pages/users/users.component";
import { PageWrapperComponent } from "./pages/page-wrapper/page-wrapper.component";
import { AuthGuard } from "./shared/services/auth/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "/dashboard/profissionais", pathMatch: "full" },
  {
    path: "dashboard",
    component: PageWrapperComponent,
    children: [
      {
        path: "aplicativos",
        canActivate: [AuthGuard],
        component: MobileComponent,
      },
      {
        path: "usuarios",
        canActivate: [AuthGuard],
        component: UsersComponent,
      },
      {
        path: "profissionais",
        canActivate: [AuthGuard],
        component: ProfessionalsComponent,
      },
    ],
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/auth/auth.module").then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
