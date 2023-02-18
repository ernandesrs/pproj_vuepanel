const icons = {
    app: 'bi bi-app',
    appIndicator: 'bi bi-app-indicator',

    checkLg: 'bi bi-check-lg',
    chevronUp: 'bi bi-chevron-up',
    chevronDown: 'bi bi-chevron-down',
    chevronLeft: 'bi bi-chevron-left',
    chevronRight: 'bi bi-chevron-right',

    clock: 'bi bi-clock',

    creditCard: 'bi bi-credit-card',

    list: 'bi bi-list',

    loading: 'bi bi-arrow-clockwise animate-spin',
    logout: 'bi bi-box-arrow-left',

    pencilSquare: 'bi bi-pencil-square',

    pieChart: 'bi bi-pie-chart',

    plusLg: 'bi bi-plus-lg',

    search: 'bi bi-search',

    trash: 'bi bi-trash',

    upload: 'bi bi-upload',

    user: 'bi bi-person',

    x: 'bi bi-x',
    xLg: 'bi bi-x-lg'
};

export default {
    icons: icons,
    get: (iconClassOrName) => {
        return icons[iconClassOrName] ?? iconClassOrName;
    }
}