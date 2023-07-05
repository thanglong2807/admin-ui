interface Data {
    type:string,
    data: any;
  }
  
  export const checkLogin = (data: any): Data => {
    return {
      type: 'admin/checkLogin',
      data: data
    };
  };
  