using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace DAL.Respositories.Interfaces
{
    public interface IBaseRepository
    {
        bool SaveEntity<T>(T entity);

        bool SaveEntities<T>(IEnumerable<T> entity);

        bool UpdateEntity<T>(T entity) where T : class, new();
        bool UpdateEntities<T>(IEnumerable<T> entity) where T : class, new();
        DbSet<T> GetEntities<T>() where T : class, new();
        IQueryable<T> GetEntities<T>(Expression<Func<T, bool>> func) where T : class, new();

        bool DeleteEntities<T>(IEnumerable<T> entity);
        bool DeleteEntities<T>(T entity);
        bool DeleteEntity<T>(T entity);
        T FirstEntity<T>(IEnumerable<T> entity);
        T LastEntity<T>(IEnumerable<T> entity);
        T GetEntity<T>(Expression<Func<T, bool>> func) where T : class, new();
    }
}
