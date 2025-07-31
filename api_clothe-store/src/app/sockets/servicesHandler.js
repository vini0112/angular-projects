
import {consulta} from '../database/connection.js'
import connection from '../database/connection.js'

export function setupServicesSocket(io, socket){
    

    socket.on('service:create', async (data) =>{
        
        try{
            const dateNow = new Date().getDay()
            const sql = "INSERT INTO test (price, worker, day) VALUES (?, ?, ?)"
            
            const [result] = await connection.promise().query(sql, [data.price, data.worker, dateNow])
            const newService = { idtest: result.insertId, ...data };
            io.emit('service:created', newService);
            console.log('✅ Service created!');
        }
        catch(err){
            console.error('Error creating service:', err);
            socket.emit('service:error', { message: 'Failed to create service' });
        }
    })
    

    socket.on('service:getAll', async () => { 
        try {
            const [services] = await connection.promise().query('SELECT * FROM test');
            socket.emit('service:list', services);
            console.log('✅ Services fetched successfully!');
        } catch (err) {
            console.error(err);
            socket.emit('service:error', 'Error fetching services');
        }
    });


    // UPDATE
    // socket.on('service:update', async (data) => {
    //     try {
    //     await db.query(
    //         'UPDATE services SET worker = ?, price = ? WHERE id = ?',
    //         [data.worker, data.price, data.id]
    //     );
    //     io.emit('service:updated', data); // notify all
    //     } catch (err) {
    //     console.error(err);
    //     socket.emit('service:error', 'Error updating service');
    //     }
    // });

  // DELETE
    socket.on('service:delete', async (id) => {
        try {
            await connection.promise().query('DELETE FROM test WHERE idtest = ?', [id]);
            io.emit('service:deleted', id); // notify all
            console.log(`✅ Service deleted successfully!`);
        } catch (err) {
            console.error(err);
            socket.emit('service:error', 'Error deleting service');
        }
    });


}

