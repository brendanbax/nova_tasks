export interface IBeforeInstall extends Event {
  readonly platforms: Array<string>
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: IBeforeInstall
  }
}

// global declaration allows the following...
// window.addEventListener("beforeinstallprompt", (e) => {}); // e is now typed
