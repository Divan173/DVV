using System.Collections.Generic;

namespace MushuRestaurant.Models.MyModels.MyTableModels
{
    public class MyResponseTable : MyBaseModel
    {
        #region Properties

        public IEnumerable<MyTable> Tables { get; set; }

        #endregion
    }
}