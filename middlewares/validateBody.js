export function validateBody(schema) {
    return(req, res, next) => {
        const results = schema.safeParse(req.body);
        if(!results.success) {
            return res.status(400).json({
                error:'validattion failed',
                details: results.error.errors
            })
        }
        req.body = results.data
        next();
    }
}