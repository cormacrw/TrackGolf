const register = (router) => {
    router.get('/test', (req, res) => {
        res.send('Public response!');
    });
};
export default { register };
