using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Catch.Backend.Domain.Entities.Profile
{
    public class PictureList
    {
        private List<Picture> _list = new List<Picture>(3);
        
        public PictureList()
        {
        }

        public void Add(Picture picture)
        {
            this._list.Add(picture);
        }

        public void AddRange(List<Picture> pictures)
        {
            this._list.AddRange(pictures.Take(3));
        }

        public int Count()
        {
            return _list.Count;
        }
   }
}
 