
export async function onRequest(context, next) {

  console.log('Middleware called');
  
  return next();
  
}
