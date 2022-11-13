class Option {
  /**
   * the id of the option
   */
  id: string;
  /**
   * the title of the option
   */
  title: string;
  /**
   * the count of match of this option
   */
  count: number;
  /**
   * the check status of the option
   */
  checked?:boolean;

  private constructor(data?: Option) {
    this.id = data?.id || '';
    this.title = data?.title || '';
    this.count = data?.count || 0;
    this.checked=data?.checked||false;
  }

  public static create(id: string,title: string,count: number,checked=false){
    return new Option({
      id,title,count,checked
    })
  }
}

export { Option };
