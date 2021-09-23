using DAL.Respositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL
{
    public class BaseRepository<U> : IBaseRepository where U : Microsoft.EntityFrameworkCore.DbContext
    {
        public U _DatabaseContext { get; set; }
        public BaseRepository(U context)
        {
            _DatabaseContext = context;
        }

        public T FirstEntity<T>(IEnumerable<T> entity)
        {
            if (entity != null && entity.Any())
            {
                return entity.FirstOrDefault();
            }
            return default(T);
        }

        public T LastEntity<T>(IEnumerable<T> entity)
        {
            if (entity != null && entity.Any())
            {
                return entity.LastOrDefault();
            }
            return default(T);
        }

        public Microsoft.EntityFrameworkCore.DbSet<T> GetEntities<T>() where T : class, new()
        {
            return _DatabaseContext.Set<T>();
        }

        public IQueryable<T> GetEntities<T>(System.Linq.Expressions.Expression<Func<T, bool>> func) where T : class, new()
        {
            return GetEntities<T>().Where(func);
        }

        public T GetEntity<T>(System.Linq.Expressions.Expression<Func<T, bool>> func) where T : class, new()
        {
            IQueryable<T> entity = GetEntities<T>(func);
            if (entity != null && entity.Any())
            {
                return entity.FirstOrDefault(func);
            }
            return default(T);
        }

        public bool SaveEntity<T>(T entity)
        {
            try
            {
                _DatabaseContext.Add(entity);

                return _DatabaseContext.SaveChanges() > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool SaveEntities<T>(IEnumerable<T> entity)
        {
            try
            {
                foreach (var item in entity)
                {
                    _DatabaseContext.AddRange(item);
                }

                return _DatabaseContext.SaveChanges() > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool DeleteEntities<T>(IEnumerable<T> entity)
        {
            try
            {
                _DatabaseContext.RemoveRange(entity);

                return _DatabaseContext.SaveChanges() > 0;
            }
            catch (Exception ex)
            {
                try
                {
                    foreach (var item in entity.ToList())
                    {
                        _DatabaseContext.Remove(item);
                    }
                    return _DatabaseContext.SaveChanges() > 0;

                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        public bool DeleteEntities<T>(T entity)
        {
            try
            {
                _DatabaseContext.RemoveRange(entity);

                return _DatabaseContext.SaveChanges() > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool DeleteEntity<T>(T entity)
        {
            try
            {
                _DatabaseContext.Remove(entity);

                return _DatabaseContext.SaveChanges() > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool UpdateEntity<T>(T entity) where T : class, new()
        {
            _DatabaseContext.Update<T>(entity);
            return _DatabaseContext.SaveChanges() > 0;
        }
        public bool UpdateEntities<T>(IEnumerable<T> entity) where T : class, new()
        {
            foreach (var item in entity)
            {
                _DatabaseContext.Update<T>(item);
            }

            return _DatabaseContext.SaveChanges() > 0;
        }
    }
}
