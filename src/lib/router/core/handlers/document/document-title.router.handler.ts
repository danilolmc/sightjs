export class DocumentTitleRouterHandler {
  setDocumentTitle(routeTitle: string) {
    if (!routeTitle) return;
    document.title = routeTitle;
  }
}
