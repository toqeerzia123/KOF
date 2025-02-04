﻿using KOF.Context;
using KOF.DTO_S;
using KOF.Models;
using KOF.Services.GenericService;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace KOF.Services.CategoryService
{
    public class CategoryService:GenericRepository<Category>,ICategoryService
    {

        private readonly IWebHostEnvironment _webHostEnvironment;
        public CategoryService(ApplicationDbContext context,IWebHostEnvironment webHostEnvironment) : base(context)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<string> UploadCategory(CategoreyDto dto)
        {
            try
            {
                string fileName = null;
                if (dto.image != null)
                {
                   fileName= UploadedFile(dto.image);
                }
                
                Category cat = new Category()
                {
                    Name = dto.Name,
                    ImageUrl = fileName,
                    Status = true
                };
                await AddAsync(cat);
                return "success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }
        public async Task<string> UpdateCategory(CategoreyDto dto)
        {
            try
            {
               
                Category cat = new Category()
                {
                    Id= (int)dto.Id,
                    Name = dto.Name,
                    Status = dto.Status
                };
                var categoryData = await GetByIdAsync(cat.Id);
                cat.ImageUrl = categoryData.ImageUrl;
                cat.CreatedOn = categoryData.CreatedOn;
                cat.CreatedBy = categoryData.CreatedBy;
                await UpdateAsync(cat);
                return "success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }
        public async Task<string> updateCategoryImage(CategoreyDto dto)
        {
            try
            {
                string fileName = null;
                if (dto.image != null)
                {
                    fileName = UploadedFile(dto.image);
                }
                Category cat = new Category()
                {
                    Id = (int)dto.Id,
                    ImageUrl = fileName,
                   
                };
                var categoryData = await GetByIdAsync(cat.Id);
                cat.Name = categoryData.Name;
                cat.Status = categoryData.Status;
                cat.CreatedBy = categoryData.CreatedBy;
                cat.CreatedOn = categoryData.CreatedOn;
                await UpdateAsync(cat);
                return "success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        private string UploadedFile(IFormFile file)
        {
            string uniqueFileName = null;

            if (file != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "Images/CategoryImages/");
                uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
            }
            return uniqueFileName;
        }

    }
}
