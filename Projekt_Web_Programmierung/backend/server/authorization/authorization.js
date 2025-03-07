// Hier wird die Autorisierung für die verschiedenen Rollen definiert.
// Die Funktion authorize überprüft, ob die Rolle des Benutzers in den erlaubten Rollen enthalten ist.

export function authorize(allowedRoles) {
    return (request, reply, done) => {
        const authHeader = request.headers['authorization']; // Holt den Authorization-Header aus der Anfrage
        if (!authHeader) {
            reply.code(401).send({ error: 'Authorization header is missing' });
            return;
        }

        const [scheme, role] = authHeader.split(' ');
        if (scheme !== 'Basic' || !allowedRoles.includes(role)) {
            reply.code(403).send({ error: 'Forbidden' });
            return;
        }

        request.userRole = role;
        done();
    };
}