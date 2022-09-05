import { AuthenticationService } from "../guards/authentication.service";

export function appInitializer(authenticationService: AuthenticationService) {
  return (): Promise<any> => {
    if (location.protocol == 'https:') {
      authenticationService.getIpAddress().subscribe((res: any) => {
        authenticationService.ipAddress = res.ip;
      });
    }
    return authenticationService.startApp();
  }
}
