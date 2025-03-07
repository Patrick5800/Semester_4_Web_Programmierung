export function authorize(allowedRoles) {
    return (request, reply, done) => {
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            reply.code(401).send({ error: 'Authorization header is missing' });
            return;
        }

        const [scheme, role] = authHeader.split(' ');
        if (scheme !== 'Basic' || !allowedRoles.includes(role)) {
            reply.code(403).send({ error: 'Forbidden' });
            return;
        }

        request.userRole = role; // Speichern der Rolle für spätere Verwendung
        done();
    };
}