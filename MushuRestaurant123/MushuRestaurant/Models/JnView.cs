//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//     Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MushuRestaurant.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class JnView
    {
        public int Id { get; set; }
        public System.DateTime Created { get; set; }
        public int TableId { get; set; }
        public string HallName { get; set; }
        public int TableNumber { get; set; }
        public System.DateTime FromDate { get; set; }
        public System.DateTime ToDate { get; set; }
        public string ClientName { get; set; }
        public string ClientPhone { get; set; }
        public Nullable<decimal> SumPrepayment { get; set; }
        public decimal SumToPay { get; set; }
        public Nullable<bool> IsPaid { get; set; }
        public Nullable<bool> IsCancel { get; set; }
        public string Comment { get; set; }
    }
}
