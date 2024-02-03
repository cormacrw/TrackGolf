const register = (router) => {
    router.get('/test', (req, res) => {
        res.send('Private response!');
    });
};
export default { register };
