class ResizeObserver {
    observe(): void {}

    unobserve(): void {}

    disconnect(): void {}
}

window.ResizeObserver = ResizeObserver;

export default ResizeObserver;
