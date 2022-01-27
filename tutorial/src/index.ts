enum Errors {
    BOOTSTRAP_ERROR = 'Could not start App',
}

try {
    (async () => await import('./bootstrap'))();
} catch (error) {
    console.error(Errors.BOOTSTRAP_ERROR, error);
}
